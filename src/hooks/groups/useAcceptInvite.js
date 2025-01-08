import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { acceptInvite as apiAcceptInvite } from "../../api/apiGroups";

export function useAcceptInvite() {
    const queryClient = useQueryClient();

    const {
        mutate: acceptInvite,
        isPending,
        data: results,
        error,
    } = useMutation({
        mutationFn: (id) => apiAcceptInvite(id),
        onSuccess: (response) => {
            toast.success('Accept Invite successfully');
            queryClient.invalidateQueries({ queryKey: ["groups", 'users', 'invites'] });
        },
        onError: (err) => {
            console.error("Error:", err);
            toast.error(err.response?.data?.message);
        },

    });

    return { isPending, error, acceptInvite, results };
}
