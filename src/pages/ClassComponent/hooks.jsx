import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { classApi } from "../../services/classApi";
import useClassStore from "./useClassStore";
import { toast } from "react-toastify";

export const useGetClassList = () => {
  const { data } = useQuery({
    queryKey: ["classList"],
    queryFn: classApi.getClassList,
  });
  return {
    data: data?.data,
  };
};

export const useGetStudentByClassId = (id) => {
  const { data } = useQuery({
    queryKey: ["studentByClassId", id],
    queryFn: () => classApi.getStudentByIdClass(id),
  });

  return {
    data: data?.data.students,
  };
};

export const useAddNewClass = () => {
  const queryClient = useQueryClient();
  const setShowModalAdd = useClassStore((state) => state.setShowModalAdd);

  const mutation = useMutation({
    mutationFn: (values) => classApi.addClass(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classList"],
      });
      setShowModalAdd(false);
      toast.success("Thêm thành công!");
    },
    onError: () => {
      toast.error("Thêm thất bại!");
    },
  });
  return { mutation };
};

export const useDeleteClass = (classId) => {
  const setShowModalDelete = useClassStore((state) => state.setShowModalDelete);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => classApi.deleteClass(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classList"],
      });
      setShowModalDelete(false);
      toast.success("Xóa thành công!");
    },
    onError: () => {
      toast.error("Xóa thất bại!");
    },
  });
  return { mutation };
};

export const useEditClass = (classId) => {
  const queryClient = useQueryClient();
  const setShowModalEdit = useClassStore((state) => state.setShowModalEdit);

  const mutation = useMutation({
    mutationFn: (values) => classApi.editClass(classId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classList"],
      });
      setShowModalEdit(false);
      toast.success("Cập nhật thành công!");
    },
    onError: () => {
      toast.error("Cập nhật thất bại!");
    },
  });
  return { mutation };
};
