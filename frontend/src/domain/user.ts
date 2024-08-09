import helloKitty from "../assets/helloKitty.png"
import akuma from "../assets/akuma.jpg"
import proerd from "../assets/proerd.png"

export const dotaPlayers = ["Amassadinho", "Propaganda do Proerd"] as const
export const users = [...dotaPlayers, "Amassador"] as const

export type DotaPlayers = (typeof dotaPlayers)[number]
export type User = (typeof users)[number]

export const isDotaPlayer = (user: string): user is DotaPlayers =>
  (dotaPlayers as readonly string[]).includes(user)
export const isUser = (user: string): user is User =>
  (users as readonly string[]).includes(user)

export const ids: { [key in DotaPlayers]: string } = {
  Amassadinho: "36020384",
  "Propaganda do Proerd": "112970123",
}

export const icons: { [key in User]: string } = {
  Amassadinho: helloKitty,
  Amassador: akuma,
  "Propaganda do Proerd": proerd,
}

export const isPredator = (user: User) => user === "Amassador"
