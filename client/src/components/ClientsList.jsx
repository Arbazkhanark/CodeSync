import Avatar from "react-avatar";

const ClientsList = ({userName}) => {
    console.log(userName)
  return (
    <div className="">
        <Avatar name={userName} size={50} round="14px" />
        <p className="text-white">{userName}</p>
    </div>
  )
}

export default ClientsList