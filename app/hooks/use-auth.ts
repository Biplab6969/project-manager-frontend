import { postData } from "@/lib/fetch-utils";
import type { SignupFormData } from "@/routes/auth/sign-up";
import { useMutation } from "@tanstack/react-query"
import type { Sign } from "crypto"

export const useSignUpmutation = () => {
    return useMutation({
        mutationFn: (data:SignupFormData) => postData("/auth/register", data),
    });
};

export const useVerifyEmailMutation = () => {
    return useMutation({
        mutationFn: (data: {token : string}) => postData("/auth/verify-email", data),
    });
}