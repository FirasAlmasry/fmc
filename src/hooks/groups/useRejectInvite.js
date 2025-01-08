import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { rejectInvite as apiRejectInvite } from "../../api/apiGroups";

export function useRejectInvite() {
      const queryClient = useQueryClient();

    const {
        mutate: rejectInvite,
        isPending,
        data: results,
        error,
    } = useMutation({
        mutationFn: (id) => apiRejectInvite(id),
        onSuccess: (response) => {
            toast.success('Reject Invite successfully');
            queryClient.invalidateQueries({ queryKey: ["groups", 'users', 'invites'] });
        },
        onError: (err) => {
            console.error("Error:", err);
            toast.error(err.response?.data?.message);
        },

    });

    return { isPending, error, rejectInvite, results };
}
