import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sendInvite as apiSendInvite } from "../../api/apiGroups";

export function useSendInvite() {
    const queryClient = useQueryClient();

    const {
        mutate: sendInvite,
        isPending,
        data: results,
        error,
    } = useMutation({
        mutationFn: (req) => apiSendInvite(req),
        onSuccess: () => {
            toast.success('Send Invite successfully');
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => {
            console.error("Error:", err);
            toast.error(err.response?.data?.error);
        },

    });

    return { isPending, error, sendInvite, results };
}
