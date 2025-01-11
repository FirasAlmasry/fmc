import { useQuery } from "@tanstack/react-query";
import { getActions } from "../../api/apiFiles";

export function useActions({ document_id, user_id, group_id }) {

    const {
        isPending,
        data: actions,
        error,
    } = useQuery({
        queryKey: ["files", document_id, user_id, group_id],
        queryFn: () => getActions({ document_id, user_id, group_id }),
        retry: false,
    });

    return { isPending, error, actions };
}
