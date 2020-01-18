import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatProgressSpinnerModule, MatRippleModule, MatSelectModule,
  MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule
} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptorSevice} from './shared/auth-interceptor.service';
import { GroupComponent } from './components/group/group.component';
import { BooksComponent } from './components/group/books/books.component';
import { ToysComponent } from './components/group/toys/toys.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { EditBookComponent } from './components/group/books/edit-book/edit-book.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserTileComponent } from './components/user-management/user-tile/user-tile.component';
import { RemoveAdminPipe } from './components/user-management/remove-admin.pipe';
import { AddUserComponent } from './components/user-management/add-user/add-user.component';
import { ChangeUserComponent } from './components/user-management/change-user/change-user.component';
import { NoWhiteSpacesDirective } from './shared/no-white-spaces.directive';
import { GroupManagementComponent } from './components/group-management/group-management.component';
import { AddGroupComponent } from './components/group-management/add-group/add-group.component';
import { ChangeGroupComponent } from './components/group-management/change-group/change-group.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    GroupComponent,
    BooksComponent,
    ToysComponent,
    ConfirmationDialogComponent,
    EditBookComponent,
    UserManagementComponent,
    UserTileComponent,
    RemoveAdminPipe,
    AddUserComponent,
    ChangeUserComponent,
    NoWhiteSpacesDirective,
    GroupManagementComponent,
    AddGroupComponent,
    ChangeGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatRippleModule,
    MatListModule,
    FormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorSevice,multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmationDialogComponent,EditBookComponent]
})
export class AppModule { }
