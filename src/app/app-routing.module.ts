import { NgModule } from"@angular/core";
import { RouterModule, Routes } from"@angular/router";
import { StudentComponent } from "./students/student/student.component";
  
const routes: Routes = [
  { path:"", component: StudentComponent },
];
  
@NgModule({
  imports:  [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}