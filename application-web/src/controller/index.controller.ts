import { User } from "../model/user.model";
import { UserService } from "../service/user.service";
import { UserUtil } from "../util/user.util";
import Handlebars from "handlebars";
import { AxiosError } from "axios";
import * as bootstrap from "bootstrap";

export class IndexController {
    userService: UserService = new UserService();
    userUtil: UserUtil = new UserUtil();
    userId: string | undefined;
    userDeleteModal: HTMLElement;
    userDeleteModalInstance: bootstrap.Modal;
    userDeleteConfirm: HTMLElement;
    userForm: HTMLFormElement;
    userFormModal: HTMLElement;
    userFormModalInstance: bootstrap.Modal;
    userFormMode: string = "create";
    userCreateAction: HTMLElement;
    userList: HTMLElement;

    constructor() {
        document.addEventListener("index:load", (event: Event) => {
            this.loadUsers();
        });

        this.userDeleteModal = document.getElementById("user-delete-modal")!;
        this.userDeleteModalInstance = bootstrap.Modal.getOrCreateInstance(
            this.userDeleteModal
        );
        this.userFormModal = document.getElementById("user-form-modal")!;
        this.userFormModalInstance = bootstrap.Modal.getOrCreateInstance(
            this.userFormModal
        );

        this.userDeleteConfirm = document.getElementById(
            "user-delete-confirm"
        ) as HTMLElement;
        this.userDeleteConfirm.addEventListener("click", (event: Event) => {
            event.preventDefault();
            if (this.userId) {
                this.deleteUser(this.userId);
            }
        });

        this.userForm = document.getElementById("user-form") as HTMLFormElement;
        if (this.userForm) {
            this.userForm.addEventListener("submit", (event: Event) => {
                event.preventDefault();
                const formData: FormData = new FormData(this.userForm);
                if (this.userFormMode == "create") {
                    this.createUser(this.userUtil.formDatatoUser(formData));
                } else if (this.userFormMode == "update") {
                    if (this.userId) {
                        this.updateUser(
                            this.userId,
                            this.userUtil.formDatatoUser(formData)
                        );
                    }
                }
            });
        }

        this.userCreateAction = document.getElementById(
            "user-create-action"
        ) as HTMLElement;
        if (this.userCreateAction) {
            this.userCreateAction.addEventListener("click", (event: Event) => {
                event.preventDefault();
                this.userFormModalInstance.show();
                this.userFormMode = "create";
                this.userForm.reset();
            });
        }

        this.userList = document.getElementById("users-list") as HTMLElement;
        if (this.userList) {
            this.userList.addEventListener("click", (event: Event) => {
                event.preventDefault();
                const target = event.target as HTMLElement;
                if (target.classList.contains("user-update-action")) {
                    this.userId = target.dataset.id;
                    if (this.userId) {
                        this.loadUser(this.userId);
                    }
                }
                if (target.classList.contains("user-delete-action")) {
                    this.userId = target.dataset.id;
                    this.userDeleteModalInstance.show();
                }
            });
        }
    }

    public loadUsers(): void {
        this.userService
            .getUsers()
            .then((users: User[]) => {
                this.renderUsers(users);
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    public loadUser(id: string): void {
        this.userService
            .getUser(id)
            .then((user: User) => {
                if (this.userForm) {
                    this.userForm.reset();
                    this.loadFormField(
                        this.userForm.elements.namedItem(
                            "name"
                        ) as HTMLInputElement,
                        user.name
                    );
                    this.loadFormField(
                        this.userForm.elements.namedItem(
                            "lastName"
                        ) as HTMLInputElement,
                        user.lastName
                    );
                    this.loadFormField(
                        this.userForm.elements.namedItem(
                            "email"
                        ) as HTMLInputElement,
                        user.email
                    );
                    this.loadFormField(
                        this.userForm.elements.namedItem(
                            "phoneNumber"
                        ) as HTMLInputElement,
                        user.phoneNumber
                    );
                }
                this.userFormMode = "update";
                this.userFormModalInstance.show();
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    public deleteUser(id: string): void {
        this.userService
            .deleteUser(id)
            .then(() => {
                this.loadUsers();
                this.userDeleteModalInstance.hide();
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    public createUser(user: User): void {
        this.userService
            .createUser(user)
            .then(() => {
                this.loadUsers();
                this.userFormModalInstance.hide();
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    public updateUser(id: string, user: User): void {
        this.userService
            .updateUser(id, user)
            .then(() => {
                this.loadUsers();
                this.userFormModalInstance.hide();
            })
            .catch((error: AxiosError) => {
                console.error(error);
            });
    }

    public renderUsers(users: User[]): void {
        const usersList = document.getElementById("users-list") as HTMLElement;
        if (users.length > 0) {
            const usersTemplate = document.getElementById(
                "users-list-item-template"
            ) as HTMLElement;
            const template = Handlebars.compile(usersTemplate.innerHTML);
            usersList.innerHTML = template({ users: users });
        } else {
            const usersTemplate = document.getElementById(
                "users-list-empty-template"
            ) as HTMLElement;
            const template = Handlebars.compile(usersTemplate.innerHTML);
            usersList.innerHTML = template({});
        }
    }

    public addMessage(type: string, message: string): void {
        const alerts = document.getElementById("global-alerts") as HTMLElement;
        const alertTemplate = document.getElementById(
            "alert-" + type
        ) as HTMLElement;
        const template = Handlebars.compile(alertTemplate.innerHTML);
        alerts.innerHTML = template({ message: message });
    }

    public loadFormField(element: HTMLInputElement, value: string): void {
        if (element) {
            element.value = String(value);
        }
    }
}
