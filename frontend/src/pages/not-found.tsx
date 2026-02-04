import { Card, CardContent } from "@/components/ui/card";
import { WarningCircle } from "iconoir-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f9fafb] p-4">
      <Card className="w-full max-w-md border-[#E2E7F1] bg-white">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <div className="bg-red-50 text-red-500 rounded-full p-3 mb-4">
            <WarningCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-[#1C1C1E] mb-2" style={{ fontFamily: 'Fustat-Bold, sans-serif' }}>
            404 - Page Not Found
          </h1>
          <p className="text-[#6B7280] mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-2 bg-[#2869D6] text-white rounded-full font-medium hover:bg-[#2869D6]/90 transition-colors"
          >
            Go back home
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
