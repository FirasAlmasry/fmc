import { useQuery } from "@tanstack/react-query";
import { getFile } from "../../api/apiFiles";
import { useParams } from "react-router-dom";

export function useFile() {
    const {id} = useParams() 
    const {
        isPending,
        data: file,
        error,
    } = useQuery({
        queryKey: ["files"],
        queryFn: () => getFile(id),
        retry: false,
    });

    return { isPending, error, file };
}
