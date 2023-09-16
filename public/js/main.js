const app = Vue.createApp({
  
});

// 使用Element Plus
app.use(ElementPlus);

// 挂载Vue应用
app.mount("#app");
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");

  const navLinks = document.querySelectorAll("#menu a");
  console.log(`Found ${navLinks.length} nav links`);

  const currentPath = window.location.pathname;
  console.log(`Current path is ${currentPath}`);

  navLinks.forEach(link => {
      const linkPath = link.getAttribute("data-url");
      console.log(`Checking link ${linkPath}`);
      
      if (linkPath === currentPath) {
          console.log(`Match found. Setting active class for ${linkPath}`);
          link.classList.add("active");
      } else {
          link.classList.remove("active");
      }
  });
});


