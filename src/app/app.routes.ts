import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiledetailsComponent } from './filedetails/filedetails.component';
import { UpdatecomponentComponent } from './updatecomponent/updatecomponent.component';
import { SearchCriteriaComponent } from './search-criteria/search-criteria.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"register",
        component:RegisterComponent
    },
    {
        path : "uploadfile",
        component : UploadFileComponent
    },
    {
        path : "dashboard",
        component : DashboardComponent
    },
    {
        path : "filedetails/:id",
        component : FiledetailsComponent
    },
    {
        path : "update/:id",
        component : UpdatecomponentComponent
    },{
        path : "searchCriteria",
        component : SearchCriteriaComponent
    },
    {
        path : "user",
        component : AdminComponent
    }
    
];
