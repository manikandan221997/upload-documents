import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeciderViewComponent } from './decider-view/decider-view.component';
import { DragDropViewComponent } from './drag-drop-view/drag-drop-view.component';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/deciderView', pathMatch: 'full' },
  { path: 'listView', component: ListViewComponent },
  { path: 'deciderView', component: DeciderViewComponent },
  { path: 'dragDropView', component: DragDropViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
