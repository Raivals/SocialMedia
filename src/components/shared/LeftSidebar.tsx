import { Link, NavLink } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation"
import { useEffect } from "react"
import { useUserContext } from "@/context/AuthContext"
import { INavLink } from "@/types"
import { sidebarLinks } from "@/constants"

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()
  const { user } = useUserContext()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess])

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="rounded-full h-14 w-14"
          />
          <div className="flex flex-col ">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            return (
              <li key={link.label} className="leftsidebar-link">
                <NavLink
                  to={link.route}
                  className="flex items-center gap-4 p-4 "
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className="group-hover:invert-white"
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default LeftSidebar
