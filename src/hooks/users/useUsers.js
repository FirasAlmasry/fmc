import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/apiUsers";

export function useUsers(group_id) {

    const {
        isPending,
        data: users,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(group_id),
        retry: false,
    });

    return { isPending, error, users };
}
