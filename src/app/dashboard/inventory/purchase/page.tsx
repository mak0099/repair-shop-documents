"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Trash2 } from "lucide-react"

const productSchema = z.object({
  product: z.string().min(1, "Product is required"),
  quantity: z.string().min(1, "Quantity is required"),
  purchasePrice: z.string().min(1, "Purchase price is required"),
  desktopPrice: z.string().optional(),
  onlinePrice: z.string().optional(),
})

const formSchema = z.object({
  supplier: z.string().min(1, "Supplier is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  paymentDate: z.string().min(1, "Payment date is required"),
  purchaseTotal: z.string().min(1, "Purchase total is required"),
  discount: z.string().optional(),
  paid: z.string().min(1, "Paid amount is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  paymentReceiptNumber: z.string().optional(),
  note: z.string().optional(),
})

type ProductData = z.infer<typeof productSchema>
type FormData = z.infer<typeof formSchema>

export default function AddProductPurchasePage() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [currentProduct, setCurrentProduct] = useState<ProductData>({
    product: "",
    quantity: "",
    purchasePrice: "",
    desktopPrice: "",
    onlinePrice: "",
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      invoiceNumber: "",
      invoiceDate: "",
      paymentDate: "",
      purchaseTotal: "",
      discount: "",
      paid: "",
      paymentMethod: "",
      paymentReceiptNumber: "",
      note: "",
    },
  })

  const addProduct = () => {
    // Validate current product
    const result = productSchema.safeParse(currentProduct)
    if (result.success) {
      setProducts([...products, result.data])
      setCurrentProduct({
        product: "",
        quantity: "",
        purchasePrice: "",
        desktopPrice: "",
        onlinePrice: "",
      })
    } else {
      // Handle validation errors
      console.log(result.error)
    }
  }

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index))
  }

  const onSubmit = (data: FormData) => {
    console.log({ products, invoice: data })
    // Handle form submission
  }

  const onReset = () => {
    setProducts([])
    setCurrentProduct({
      product: "",
      quantity: "",
      purchasePrice: "",
      desktopPrice: "",
      onlinePrice: "",
    })
    form.reset()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Product Purchase</h1>
        <p className="text-muted-foreground">Record a new product purchase from supplier</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Entry Section */}
        <Card>
          <CardHeader>
            <CardTitle>Product Entry</CardTitle>
            <CardDescription>Add products to the purchase order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium">Product</label>
                <Input
                  placeholder="Search product"
                  value={currentProduct.product}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, product: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={currentProduct.quantity}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Purchase Price</label>
                  <Input
                    type="number"
                    placeholder="Purchase price"
                    value={currentProduct.purchasePrice}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, purchasePrice: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Desktop Price</label>
                  <Input
                    type="number"
                    placeholder="Desktop price"
                    value={currentProduct.desktopPrice}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, desktopPrice: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Online Price</label>
                  <Input
                    type="number"
                    placeholder="Online price"
                    value={currentProduct.onlinePrice}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, onlinePrice: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <Button onClick={addProduct} className="w-full">Add Product</Button>

            {/* Product List */}
            <div className="space-y-2">
              <h4 className="font-medium">Added Products</h4>
              {products.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{product.product}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {product.quantity} | Price: ${product.purchasePrice}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeProduct(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoice & Payment Section */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice & Payment</CardTitle>
            <CardDescription>Enter invoice and payment details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select supplier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Supplier 1">Supplier 1</SelectItem>
                          <SelectItem value="Supplier 2">Supplier 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Invoice number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="invoiceDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="paymentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purchaseTotal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Total</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Purchase total" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Discount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paid</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Paid amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Card">Card</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentReceiptNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Receipt Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Receipt number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Note</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Notes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={onReset}>Reset</Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}