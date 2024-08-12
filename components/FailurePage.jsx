import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function FailurePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-red-100">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-red-700">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            We are sorry, but your payment could not be processed. Please try again or contact support.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/payment">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Try Again
            </Button>
          </Link>
          <Link href="/support">
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
              Contact Support
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}