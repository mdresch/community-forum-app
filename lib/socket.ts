"use client"

import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

let socket: Socket | null = null

export const initializeSocket = () => {
  if (!socket) {
    // In a real app, this would be your server URL
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })
  }
  return socket
}

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = initializeSocket()

    const onConnect = () => {
      console.log("Socket connected")
      setIsConnected(true)
    }

    const onDisconnect = () => {
      console.log("Socket disconnected")
      setIsConnected(false)
    }

    socketInstance.on("connect", onConnect)
    socketInstance.on("disconnect", onDisconnect)

    // If the socket is already connected, set state accordingly
    if (socketInstance.connected) {
      setIsConnected(true)
    }

    return () => {
      socketInstance.off("connect", onConnect)
      socketInstance.off("disconnect", onDisconnect)
    }
  }, [])

  return { socket, isConnected }
}

export const useSocketEvent = <T = any>(event: string, callback: (data: T) => void) => {
  useEffect(() => {
    const socketInstance = initializeSocket()

    socketInstance.on(event, callback)

    return () => {
      socketInstance.off(event, callback)
    }
  }, [event, callback])
}

export const emitSocketEvent = <T>(event: string, data: T) => {
  const socketInstance = initializeSocket()
  if (socketInstance) {
    socketInstance.emit(event, data)
  }
}
