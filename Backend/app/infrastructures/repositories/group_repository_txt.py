from app.domain.repositories_interfaces.group_repository_interface import GroupRepositoryInterface
import os
class GroupRepositoryTxt(GroupRepositoryInterface):
    def __init__(self):
        self.file_path = "db/groups.txt"
        db_dir = os.path.dirname(self.file_path)
        # Ensure the directory exists
        os.makedirs(db_dir, exist_ok=True)
        # check if the file exists
        if not os.path.exists(self.file_path):
            # create the file
            with open(self.file_path, "w") as file:
                file.write("")
        


    def get_highest_id(self) -> int:
        with open(self.file_path, "r") as file:
            highest_id = 0
            for line in file:
                if int(line.split(",")[0]) > highest_id:
                    highest_id = int(line.split(",")[0])
            return highest_id


    def create_group(self, group_name: str) -> int:
        with open(self.file_path, "a") as file:
            new_group_id = self.get_highest_id() + 1
            

            # create lists with ids
            pantry_list_id = 0
            default_list_id = 0
            shopping_list_id = 0


            file.write(f"{new_group_id},{group_name},{[]},{[]},{pantry_list_id},{default_list_id},{shopping_list_id}\n")
        return new_group_id

    def delete_group(self, group_id: int) -> bool:
        with open(self.file_path, "r") as file, open(self.file_path + ".tmp", "w") as tmp_file:
            found = False
            for line in file:
                if str(group_id) != line.split(",")[0]:
                    tmp_file.write(line)
                else:
                    found = True
                
            
        if found:
            os.replace(self.file_path + ".tmp", self.file_path)
            return True
        else:
            os.remove(self.file_path + ".tmp")
            return False


    def add_user_to_group(self, group_id: int, user_email: str) -> bool:
        with open(self.file_path, "r") as file, open(self.file_path + ".tmp", "w") as tmp_file:
            found = False
            for line in file:
                if str(group_id) == line.split(',')[0]:
                    fields = line.split(',')
                    users_str = fields[2].strip('[]')
                    users = users_str.split(';') if users_str else []
                    users.append(user_email)
                    fields[2] = f"[{';'.join(users)}]"
                    tmp_file.write(f"{','.join(fields)}")
                    found = True
                else:
                    tmp_file.write(line)
            
        if found:
            os.replace(self.file_path + ".tmp", self.file_path)
            return True
        else:
            os.remove(self.file_path + ".tmp")
            return False
        

    def remove_user_from_group(self, group_id: int, user_email: str) -> bool:
        with open(self.file_path, "r") as file, open(self.file_path + ".tmp", "w") as tmp_file:
            found = False
            for line in file:
                if str(group_id) == line.split(',')[0]:
                    fields = line.split(',')
                    users = fields[2].strip('[]').split(';')
                    if user_email in users:
                        users.remove(user_email)
                        found = True
                        fields[2] = f"[{';'.join(users)}]"
                    tmp_file.write(f"{','.join(fields)}")
                else:
                    tmp_file.write(line)
            
        if found:
            os.replace(self.file_path + ".tmp", self.file_path)
            return True
        else:
            os.remove(self.file_path + ".tmp")
            return False

    def promote_user_to_admin(self, group_id: int, user_email: str) -> bool:
        with open(self.file_path, "r") as file, open(self.file_path + ".tmp", "w") as tmp_file:
            found = False
            for line in file:
                if str(group_id) == line.split(',')[0]:
                    fields = line.split(',')
                    users = fields[2].strip('[]').split(';')
                    if user_email in users:
                        admins_str = fields[3].strip('[]')
                        admins = admins_str.split(';') if admins_str else []
                        if user_email not in admins:
                            admins.append(user_email)
                            fields[3] = f"[{';'.join(admins)}]"
                            found = True
                            tmp_file.write(f"{','.join(fields)}")
                else:
                    tmp_file.write(line)
            
        if found:
            os.replace(self.file_path + ".tmp", self.file_path)
            return True
        else:
            os.remove(self.file_path + ".tmp")
            return False

    def demote_admin_to_user(self, group_id: int, user_email: str) -> bool:
        with open(self.file_path, "r") as file, open(self.file_path + ".tmp", "w") as tmp_file:
            found = False
            for line in file:
                if str(group_id) == line.split(',')[0]:
                    fields = line.split(',')
                    admins = fields[3].strip('[]').split(';')
                    if user_email in admins:
                        admins.remove(user_email)
                        found = True
                        fields[3] = f"[{';'.join(admins)}]"
                    tmp_file.write(f"{','.join(fields)}")
                else:
                    tmp_file.write(line)
            
        if found:
            os.replace(self.file_path + ".tmp", self.file_path)
            return True
        else:
            os.remove(self.file_path + ".tmp")
            return False

    def get_groups_by_user_email(self, user_email: str) -> list[int]:
        groups = []
        with open(self.file_path, "r") as file:
            for line in file:
                if user_email in line.split(',')[2]:
                    groups.append(int(line.split(',')[0]))
        return groups

