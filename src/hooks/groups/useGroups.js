import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../../api/apiGroups";

export function useGroups() {

    const {
        isPending,
        data: groups,
        error,
    } = useQuery({
        queryKey: ["groups"],
        queryFn: () => getGroups(),
        retry: false,
    });

    return { isPending, error, groups };
}
