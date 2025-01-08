import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { chickIn as apiChickIn } from "../../api/apiFiles";

export function useChickIn() {
    const queryClient = useQueryClient();

    const {
        mutate: chickIn,
        isPending: isChickIn,
        data: results,
        error,
    } = useMutation({
        mutationFn: (id) => apiChickIn(id),
        onSuccess: () => {
            toast.success(`Chick In file successfully`);
            queryClient.invalidateQueries({
                queryKey: ["files"],
            });
        },
        onError: (err) => {
            console.error("🚀 ~ useChickIn ~ error response:", err);
            toast.error(err.response?.data?.message);
        },

    });

    return { chickIn, isChickIn, error, results };
}
