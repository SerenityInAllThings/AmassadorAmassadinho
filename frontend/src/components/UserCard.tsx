import helloKitty from "../assets/helloKitty.png"
import akuma from "../assets/akuma.png"

type User = "Amassadinho" | "Amassador"

const icons: { [key in User]: string } = {
  Amassadinho: helloKitty,
  Amassador: akuma,
}

type Props = {
  user: User
}

export const UserCard = ({ user }: Props) => {
  const icon = icons[user]
  return (
    <div className="flex h-20 w-max items-center rounded-md bg-brandDarkBlue p-2 font-bold text-white">
      <img src={icon} className="h-16 w-16 rounded-3xl" />
      <p className="ml-2 h-min text-lg">{user}</p>
    </div>
  )
}
