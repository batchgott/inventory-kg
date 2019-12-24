import {Pipe, PipeTransform} from '@angular/core';
import {ERole, User} from '../../model/user.model';

@Pipe({
  name: 'removeAdmin'
})
export class RemoveAdminPipe implements PipeTransform {

  transform(inputUsers: Array<User>): any {
    if (!inputUsers)return;
    let users:Array<User>=[];
    inputUsers.forEach(user=>{
      if(user.role!=ERole.ADMIN)
        users.push(user);}
    );
    return users;
  }

}
