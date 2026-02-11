"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { AcceptanceCustomerDeviceFields } from "./acceptance-customer-device-fields"
import { AcceptanceTechnicalFinancialFields } from "./acceptance-technical-financial-fields"
import { AcceptanceStatusFields } from "./acceptance-status-fields"

import { formSchema, type FormData } from "@/types/forms";

export default function AddAcceptancePage() {
  const [photoPreviews, setPhotoPreviews] = useState<{ [key: string]: string }>({})


  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      estimated_price: "",
      brand: "",
      model: "",
      color: "",
      accessories: "",
      device_type: "",
      current_status: "IN REPAIR",
      defect_description: "",
      notes: "",
      created_date: new Date(),
      imei: "",
      secondary_imei: "",
      technician_id: "",
      warranty: "",
      replacement_device: "",
      dealer: "",
      price_offered: "",
      reserved_notes: "",
      important_information: "No",
      pin_unlock: "No",
      pin_unlock_number: "",
      urgent: "No",
      urgent_date: undefined,
      quote: "No",
    },
  })



  const handlePhotoUpload = (fieldName: string, file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreviews(prev => ({
          ...prev,
          [fieldName]: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
      form.setValue(fieldName as keyof FormData, file)
    } else {
      setPhotoPreviews(prev => {
        const newPreviews = { ...prev }
        delete newPreviews[fieldName]
        return newPreviews
      })
      form.setValue(fieldName as keyof FormData, undefined)
    }
  }

  const removePhoto = (fieldName: string) => {
    setPhotoPreviews(prev => {
      const newPreviews = { ...prev }
      delete newPreviews[fieldName]
      return newPreviews
    })
    form.setValue(fieldName as keyof FormData, undefined)
  }

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form data:", data)
      // TODO: Implement API call to create acceptance
      // Generate acceptance number (e.g., 41604-2025)
      const acceptanceNumber = `${new Date().getTime().toString().slice(-5)}-${new Date().getFullYear()}`

      // TODO: Submit to API and redirect to edit page with generated acceptance number
      alert(`Acceptance created successfully! Number: ${acceptanceNumber}`)
    } catch (error) {
      console.error("Error creating acceptance:", error)
    }
  }



  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-600">Add Acceptance</h1>
      </div>

      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AcceptanceCustomerDeviceFields />
              <AcceptanceTechnicalFinancialFields />
              <AcceptanceStatusFields
                photoPreviews={photoPreviews}
                handlePhotoUpload={handlePhotoUpload}
                removePhoto={removePhoto}
              />
            </div>

            {/* Submit Section */}
            <div className="flex justify-start">
              <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-8">Save</Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  )
}