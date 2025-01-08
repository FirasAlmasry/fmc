import { useQuery } from "@tanstack/react-query";
import { getGroup } from "../../api/apiGroups";
import { useParams } from "react-router-dom";

export function useGroup() {
    const {id} = useParams() 
    const {
        isPending,
        data: group,
        error,
    } = useQuery({
        queryKey: ["files", "group"],
        queryFn: () => getGroup(id),
        retry: false,
    });

    return { isPending, error, group };
}
