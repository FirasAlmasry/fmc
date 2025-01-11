import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { chickOut as apiChickOut } from "../../api/apiFiles";

export function useChickOut(id) {
    const queryClient = useQueryClient();

    const {
        mutate: chickOut,
        isPending: isChickOut,
        data: results,
        error,
    } = useMutation({
        mutationFn: (req) => apiChickOut({id, req}),
        onSuccess: () => {
            toast.success(`Chick Out file successfully`);
            queryClient.invalidateQueries({
                queryKey: ["files"],
            });
        },
        onError: (err) => {
            console.error("🚀 ~ useChickOut ~ error response:", err);
            toast.error(err.response?.data?.message);
        },

    });

    return { chickOut, isChickOut, error, results };
}
