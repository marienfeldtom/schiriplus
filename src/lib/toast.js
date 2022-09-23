import { toast } from "@zerodevx/svelte-toast";

export function errorToast(message){
    toast.push(message, {
        theme: {
          "--toastBackground": "#F56565",
          "--toastBarBackground": "#C53030",
        },
      });
  }
  export function successToast(message){
    toast.push(message, {
        theme: {
          '--toastBackground': '#48BB78',
          '--toastBarBackground': '#2F855A'
        }
      })
  }