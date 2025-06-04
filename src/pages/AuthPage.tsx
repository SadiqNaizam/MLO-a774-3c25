import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Explicitly import Label if not using FormLabel
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Cat } from 'lucide-react'; // Doraemon is a cat robot

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AuthPage = () => {
  console.log('AuthPage loaded');
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "user@example.com", // Default credential
      password: "password123", // Default credential
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(isLogin ? 'Login submitted:' : 'Signup submitted:', data);
    setError(null);
    // Simulate API call
    if (data.email === "user@example.com" && data.password === "password123" && isLogin) {
        console.log('Login successful, navigating to home...');
        navigate('/');
    } else if (isLogin) {
        setError("Invalid email or password. Try user@example.com / password123");
    } else {
        // Simulate signup success
        console.log('Signup successful, navigating to home...');
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <Cat className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-3xl font-bold">{isLogin ? 'Welcome Back!' : 'Create Account'}</CardTitle>
          <CardDescription>{isLogin ? 'Login to access your music.' : 'Sign up to start listening.'}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isLogin && ( // Simple way to add a confirm password or other fields for signup
                 <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                </div>
              )}
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button variant="link" onClick={() => { setIsLogin(!isLogin); setError(null); form.reset(); }} className="text-blue-600 hover:text-blue-700">
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;