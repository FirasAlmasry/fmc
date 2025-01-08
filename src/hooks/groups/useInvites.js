import { useQuery } from "@tanstack/react-query";
import { getInvites } from "../../api/apiGroups";

export function useInvites() {

    const {
        isPending,
        data: invites,
        error,
    } = useQuery({
        queryKey: ["groups", 'users', 'invites'],
        queryFn: () => getInvites(),
        retry: false,
    });

    return { isPending, error, invites };
}
