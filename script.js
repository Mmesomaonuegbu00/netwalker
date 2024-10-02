function dropDown() {
  const userName = document.querySelector(".user-name");
  if (window.innerWidth < 768) {
    userName.style.display =
      userName.style.display === "none" || userName.style.display === ""
        ? "block"
        : "none";
  }
}

const userImg = document.querySelector(".img2");
userImg.addEventListener("click", dropDown);

