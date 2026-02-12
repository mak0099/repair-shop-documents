"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { formSchema, type FormData as AcceptanceFormData } from "@/features/acceptances/types/forms"
import { useCreateAcceptance } from "@/features/acceptances/api/acceptances.mutations"
import { type Acceptance } from "@/features/acceptances/types/acceptance"
import { CustomerDeviceFields } from "@/features/acceptances/components/add/CustomerDeviceFields"
import { TechnicalFinancialFields } from "@/features/acceptances/components/add/TechnicalFinancialFields"
import { StatusFields } from "@/features/acceptances/components/add/StatusFields"

export default function AddAcceptancePage() {
  const router = useRouter()
  const [photoPreviews, setPhotoPreviews] = useState<{ [key: string]: string }>({})
  const { mutateAsync: createAcceptance } = useCreateAcceptance()


  const form = useForm<AcceptanceFormData>({
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
        reader.onload = (e: ProgressEvent<FileReader>) => {
        setPhotoPreviews(prev => ({
          ...prev,
          [fieldName]: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
      form.setValue(fieldName as keyof AcceptanceFormData, file)
    } else {
      setPhotoPreviews(prev => {
          const newPreviews = { ...prev };
          delete newPreviews[fieldName];
          return newPreviews;
        });
        form.setValue(fieldName as keyof AcceptanceFormData, undefined);
    }
  }

  const removePhoto = (fieldName: string) => {
    setPhotoPreviews((prev: { [key: string]: string }) => {
      const newPreviews = { ...prev }
      delete newPreviews[fieldName]
      return newPreviews
    })
  }

  const onSubmit = async (data: AcceptanceFormData) => {
    try {
      // Map form data to Acceptance type
      const acceptance: Acceptance = {
        id: "", // or generate UUID if needed
        acceptance_number: "", // or generate if needed
        customer_name: data.customer_name,
        estimated_price: data.estimated_price ? Number(data.estimated_price) : undefined,
        brand: data.brand,
        model: data.model,
        color: data.color,
        accessories: data.accessories,
        device_type: data.device_type,
        current_status: data.current_status,
        defect_description: data.defect_description,
        notes: data.notes,
        created_date: data.created_date.toISOString(),
        imei: data.imei,
        secondary_imei: data.secondary_imei,
        technician_id: data.technician_id,
        warranty: data.warranty,
        replacement_device: data.replacement_device,
        dealer: data.dealer,
        price_offered: data.price_offered ? Number(data.price_offered) : undefined,
        reserved_notes: data.reserved_notes,
        important_information: data.important_information === "Yes",
        pin_unlock: data.pin_unlock === "Yes",
        pin_unlock_number: data.pin_unlock_number,
        urgent: data.urgent === "Yes",
        urgent_date: data.urgent_date ? data.urgent_date.toISOString() : undefined,
        quote: data.quote === "Yes",
        photos: [data.photo_1, data.photo_2, data.photo_3, data.photo_4, data.photo_5].filter(Boolean).map(() => ""), // Replace with actual upload logic
        branch_id: "", // Set branch_id as needed
      }
      await createAcceptance(acceptance)
      router.push("/dashboard/acceptances")
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
              <CustomerDeviceFields />
              <TechnicalFinancialFields />
              <StatusFields
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