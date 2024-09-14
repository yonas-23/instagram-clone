import Home from "./Home";
import CreatePost from "./CreatePost";
import ProfileLink from "./ProfileLink";
import Notifications from "./Notification";
import Search from "./Search";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <CreatePost />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
