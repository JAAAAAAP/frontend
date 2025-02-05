import { dashboardstat, userStat } from "../service/dashbaord";
import { useQuery } from "@tanstack/react-query";

export const useDashboardstat = () => {
    const { data, error } = useQuery({
        queryKey: ["dashboardstat"],
        queryFn: () => dashboardstat(),
    });
    const statdata = data?.data
    return { statdata, error };
};
export const useUserStat = () => {
    const { data, error } = useQuery({
        queryKey: ["userstat"],
        queryFn: () => userStat(),
    });
    const statdata = data?.data
    return { statdata, error };
};