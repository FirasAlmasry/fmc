import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { acceptFile as apiAcceptFile } from "../../api/apiFiles";

export function useAcceptFile() {
    const queryClient = useQueryClient();

    const {
        mutate: acceptFile,
        isPending: isAccept,
        data: results,
        error,
    } = useMutation({
        mutationFn: (id) => apiAcceptFile(id),
        onSuccess: () => {
            toast.success(`accepted file successfully`);
            queryClient.invalidateQueries({
                queryKey: ["files"],
            });
        },
        onError: (err) => {
            console.error("🚀 ~ useaccept ~ error response:", err);
            toast.error(err.response?.data?.message);
        },

    });

    return { acceptFile, isAccept, error, results };
}
