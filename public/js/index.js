function delItem() {
  if (confirm('Press "OK" if you want to delete the item')) {
           $(".delete-item").submit();
       } else {
           return false;
       }
}

function delList() {
  if (confirm('Press "OK" if you want to delete the list')) {
           $(".delete-list").submit();
       } else {
           return false;
       }
}
