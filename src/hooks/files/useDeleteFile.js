import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteFile as apiDeleteFile } from "../../api/apiFiles";

export function useDeleteFile() {
    const queryClient = useQueryClient();

    const {
        mutate: deleteFile,
        isPending: isDelete,
        data: results,
        error,
    } = useMutation({
        mutationFn: (id) => apiDeleteFile(id),
        onSuccess: (response) => {
            console.log("🚀 ~ useDeleteFile ~ response:", response)
            toast.success(`deleted file successfully`);
            queryClient.invalidateQueries({
                queryKey: ["files"],
            });
        },
        onError: (err) => {
            console.error("🚀 ~ useDelete ~ error response:", err);
            toast.error(err.response?.data?.message);
        },

    });

    return { deleteFile, isDelete, error, results };
}
