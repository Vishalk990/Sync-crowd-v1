import { useUser, useSession } from "@clerk/nextjs";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

export function  useSaveUserToDatabase() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { session, isLoaded: isSessionLoaded } = useSession();
  const [saveStatus, setSaveStatus] = useState(null);
  const isSavingRef = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isUserLoaded && isSessionLoaded && user && session) {
      checkAndSaveUser(user);
      console.log(user.firstName); // Add a check here
    }
  }, [isUserLoaded, isSessionLoaded, user, session]);

  async function checkAndSaveUser(user) {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setSaveStatus('checking');

    try {
      // First, check if the user exists in the database
      const checkResponse = await fetch('/api/user/allusers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
        }),
      });

      if (!checkResponse.ok) {
        throw new Error('Failed to check user');
      }

      const { exists } = await checkResponse.json();

      if (exists) {
        // User already exists, just show a toast
        setSaveStatus('success');
        toast({
          title: "Welcome back!",
          description: "You're successfully logged in.",
          duration: 2000,
        });
      } else {
 
        await saveUserToDatabase(user);
      }
    } catch (error) {
      console.error('Error checking/saving user:', error.message);
      setSaveStatus('error');
      toast({
        title: "Error",
        description: "Error syncing user data. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      isSavingRef.current = false;
    }
  }

  async function saveUserToDatabase(user) {
    setSaveStatus('saving');
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.fullName || `${user.firstName} ${user.lastName}`.trim(),
          email: user.primaryEmailAddress.emailAddress,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user');
      }

      const data = await response.json();
      console.log('User successfully registered in DB:', data.user);
      setSaveStatus('success');
      toast({
        title: "Success",
        description: "Welcome to Sync-Crowd!",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error saving user to DB:', error.message);
      setSaveStatus('error');
      toast({
        title: "Error",
        description: "Error registering user. Please try again.",
        variant: "destructive",
        duration: 2000,
      });
    }
  }

  return saveStatus;
}
