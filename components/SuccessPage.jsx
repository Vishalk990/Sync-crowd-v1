"use client"
import { useState, useEffect } from 'react';
import { CheckCircle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Confetti from 'react-confetti'

export function SuccessPage() {
  const [confettiOpacity, setConfettiOpacity] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setShowConfetti(true);
    
    const storedSessionId = localStorage.getItem('sessionId');
    const storedAmount = localStorage.getItem('amount');
    
    if (storedSessionId) setSessionId(storedSessionId);
    if (storedAmount) setAmount(storedAmount);

    // localStorage.removeItem('sessionId');
    // localStorage.removeItem('amount');
    
    const fadeOutTimer = setTimeout(() => {
      const fadeInterval = setInterval(() => {
        setConfettiOpacity((prevOpacity) => {
          if (prevOpacity <= 0) {
            clearInterval(fadeInterval);
            setShowConfetti(false);
            return 0;
          }
          return prevOpacity - 0.02;
        });
      }, 50);
    }, 2500);

    return () => clearTimeout(fadeOutTimer);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', opacity: confettiOpacity }}>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
      <Card className="w-[500px] shadow-lg animate-fadeIn">
        <CardHeader>
          <div className="flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-center text-green-700 mt-4">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Thank you for your purchase. Your transaction has been completed successfully.
          </p>
          {amount && (
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-lg font-semibold text-green-800 text-center">
                Amount Paid: ${(parseInt(amount) / 100).toFixed(2)}
              </p>
            </div>
          )}
          {sessionId && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-700 font-medium mb-2">Transaction ID:</p>
              <div className="flex items-center justify-between bg-white p-2 rounded">
                <p className="text-xs text-gray-600 truncate w-[300px]">{sessionId}</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(sessionId)}
                  className="ml-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Return to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}