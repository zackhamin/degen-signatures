'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAccount } from 'wagmi';

export function SignatureForm() {
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isConnected || !formData.name || !formData.country) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/signatures/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          name: formData.name,
          country: formData.country,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Signature submitted:', data);
        // Clear form after successful submission
        setFormData({ name: "", country: "" });
      } else {
        console.error('Submission failed:', data.message);
      }
    } catch (error) {
      console.error('Error submitting signature:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText = !isConnected 
    ? "Connect Wallet First" 
    : isLoading
      ? "Submitting..."
      : !formData.name || !formData.country 
        ? "Fill All Fields" 
        : "Sign & Send";

  return (
    <Card className="border-2 border-purple-500 bg-black/60 backdrop-blur-sm text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Leave Your Mark
        </CardTitle>
        <CardDescription className="text-gray-400">
          Sign your name in the blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-200">
              Your Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Vitalik"
              className="bg-purple-900/20 border-purple-500 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country" className="text-gray-200">
              Your Country
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="ETH Land"
              className="bg-purple-900/20 border-purple-500 text-white placeholder:text-gray-500"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          disabled={!isConnected || !formData.name || !formData.country || isLoading}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}