import { toast } from "@/components/ui/use-toast";

/**
 * A wrapper around the native JavaScript `fetch` function that intercepts responses.
 * 
 * If the response has a `!res.ok` status (like 400 or 500), it parses the error message
 * from the JSON payload (or uses a fallback) and triggers a global error toast notification.
 * 
 * It then returns the original `Response` object so the calling code behaves normally.
 */
export async function fetchApi(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    try {
        const response = await fetch(input, init);

        if (!response.ok) {
            // Clone the response so we can read the body without consuming the stream 
            // for the actual caller who might want to read it too.
            const clone = response.clone();
            let errorMessage = "An unexpected error occurred.";
            
            try {
                const errorData = await clone.json();
                
                if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
                    errorMessage = errorData.errors.map((err: any) => err.message).join('\n');
                } else {
                    errorMessage = errorData.message || errorData.error || errorMessage;
                }
            } catch (e) {
                // If the response is not JSON, we might fallback to status text.
                errorMessage = response.statusText || errorMessage;
            }

            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        }

        return response;
    } catch (error: any) {
        // Handle network errors (e.g., CORS, DNS resolution failed, server down)
        toast({
            title: "Network Error",
            description: error.message || "Failed to connect to the server.",
            variant: "destructive",
        });

        throw error;
    }
}
