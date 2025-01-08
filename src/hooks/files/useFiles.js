import { useQuery } from "@tanstack/react-query";
import { getFiles } from "../../api/apiFiles";

export function useFiles({group_id ,status}) {

    const {
        isPending,
        data: files,
        error,
    } = useQuery({
        queryKey: ["files", status, group_id],
        queryFn: () => getFiles({group_id, status}),
        retry: false,
    });

    return { isPending, error, files };
}
