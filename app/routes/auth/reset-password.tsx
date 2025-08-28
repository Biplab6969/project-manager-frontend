import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResetPasswordMutation } from '@/hooks/use-auth';
import { resetPasswordSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Check, CheckCircle, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { data, Link, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import z from 'zod'

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
const ResetPasword = () => {

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [isSuccess, setIsSuccess] = useState(false);
  const {mutate: resetPassword, isPending} = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormData) => {
    if(!token){
      toast.error("Invalid token");
      return;
    }
    resetPassword(
      {...values, token :token as string},
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message;
          console.log(error);
          toast.error(errorMessage);
        },
      }
    )
  };


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full max-w-md space-y-6'>
        <div className='flex flex-col items-center justify-center space-y-2'>
          <h1 className='text-2xl font-bold'>Reset Password</h1>
          <p className='text-muted-foreground'>Enter your new password below</p>
          <p className='text-xs text-muted-foreground'>This link will expire in 15 minutes.</p>
        </div>
        <Card>
          <CardHeader>
            <Link to="/sign-in" className='flex items-center gap-2 '>
              <ArrowLeft className='w-4 h-4' />
              <span>Back to sign in</span>
            </Link>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className='flex flex-col items-center justify-center'>
                <CheckCircle className='w-10 h-10 text-green-500' />
                <h1 className='text-2xl font-bold'>Password Reset Successful</h1>
              </div>
            ) : (<Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  name="newPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Enter your email' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmNewPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Enter your email' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full' disabled={isPending}>
                  {isPending ? (
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResetPasword
