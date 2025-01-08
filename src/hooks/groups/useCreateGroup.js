import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addGroup } from "../../api/apiGroups";

export function useCreateGroup() {
      const queryClient = useQueryClient();

    const {
        mutate: createGroup,
        isPending,
        data: results,
        error,
    } = useMutation({
        mutationFn: (req) => addGroup(req),
        onSuccess: (response) => {
            toast.success('group added successfully');
            queryClient.invalidateQueries({ queryKey: ["groups"] });
        },
        onError: (err) => {
            console.error("Error:", err);
            toast.error(err.response?.data?.message);
        },

    });

    return { isPending, error, createGroup, results };
}
