import { useRef } from 'react'
import { recordVisit } from '../service/visitor'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useRecordVisit = () => {
    const queryClient = useQueryClient()
    const isRecordingRef = useRef(false);

    const mutation = useMutation({
        mutationFn: async () => {

            if (isRecordingRef.current) {
                return;
            }

            const hasVisitedThisSession = sessionStorage.getItem('hasVisitedThisSession');

            if (!hasVisitedThisSession) {
                try {
                    isRecordingRef.current = true;
                    await recordVisit()
                    // บันทึกว่าได้เยี่ยมชมแล้วในวันนี้
                    localStorage.setItem('hasVisitedThisSession', 'true')
                } catch (error) {
                    throw error
                } finally {
                    isRecordingRef.current = false;
                }
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries(['dashboardstat'])
        },
        onError: (error) => {
            throw error
        }
    })

    return { ...mutation }
}