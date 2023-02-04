
const tabs =  document.querySelectorAll('[role="tab"]');
const tabList = document.querySelector('[role="tablist"]');


let tabFocus = 0;
tabList.addEventListener('keydown', (e)=>{
    const leftKeyCode = 37;
    const rightKeyCode = 39;

    if(e.keyCode === leftKeyCode || e.keyCode === rightKeyCode){
        tabs[tabFocus].setAttribute('tabIndex', -1);

        if(e.keyCode === rightKeyCode){
            tabFocus ++;
            if(tabFocus >= tabs.length){
                tabFocus =0;
            }
        }else if(e.keyCode === leftKeyCode){
            tabFocus--;
            if(tabFocus < 0){
                tabFocus = tabs.length -1;
            }
        }
    tabs[tabFocus].setAttribute('tabIndex',0);
    tabs[tabFocus].focus();
    }
});

tabs.forEach((tab) => {
    tab.addEventListener('click', changePanel);
})

function changePanel(e){
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');   
    const targetTabList = targetTab.parentElement;
    const targetParent = targetTabList.parentNode;
    const targetImage = targetTab.getAttribute('data-image');
    
    // Highlighting the active tab
    targetTabList
        .querySelectorAll('[aria-selected="true"]')
            .forEach((tab) => tab
            .setAttribute('aria-selected',false));

    
    targetTab.ariaSelected = true;

    hideTabContent(targetParent,'[role="tabpanel"]');
    hideTabContent(targetParent, "picture");

    showTabContent(targetParent,[`#${targetPanel}`]);
    showTabContent(targetParent,[`#${targetImage}`]);

}

function hideTabContent(parent, content){
    parent
        .querySelectorAll(content)
        .forEach((item)=>
         item.setAttribute("hidden",true));
}

function showTabContent(parent, content){
      parent
          .querySelector(content).hidden = false;
 }