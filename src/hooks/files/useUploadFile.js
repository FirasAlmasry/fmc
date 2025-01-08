import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addFile } from "../../api/apiFiles";

export function useUploadFile() {
    const queryClient = useQueryClient();

    const {
        mutate: uploadFile,
        isPending,
        data: results,
        error,
    } = useMutation({
        mutationFn: (req) => addFile(req),
        onSuccess: () => {
            toast.success('file upload successfully');
            queryClient.invalidateQueries({ queryKey: ["files", 'group'] });
        },
        onError: (err) => {
            console.error("Error:", err);
            toast.error(err.response?.data?.message);
        },

    });

    return { isPending, error, uploadFile, results };
}
