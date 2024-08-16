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

export const useGetTrainingProgram = () => {
  const { data } = useQuery({
    queryKey: ["trainingProgram-list"],
    queryFn: classApi.getTrainingProgram,
  });

  return {
    data: data?.data,
  };
};

export const useAddNewClass = (form) => {
  const queryClient = useQueryClient();
  const setShowModalAdd = useClassStore((state) => state.setShowModalAdd);
  const { data: trainingPrograms } = useGetTrainingProgram();
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

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        const selectedProgram = trainingPrograms.find(
          (program) => program.id === values.trProgramName
        );

        const formattedValues = {
          ...values,
          startDate: values.startDate.format("YYYY-MM-DD"),
          endDate: values.endDate.format("YYYY-MM-DD"),
          trProgramName: selectedProgram?.programName,
        };
        mutation.mutate(formattedValues);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };
  return { handleAddNew };
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

export const useEditClass = (classId, form) => {
  const queryClient = useQueryClient();
  const setShowModalEdit = useClassStore((state) => state.setShowModalEdit);
  const { data: trainingPrograms } = useGetTrainingProgram();

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

  const handleEditClass = () => {
    form
      .validateFields()
      .then((values) => {
        const selectedProgram = trainingPrograms.find(
          (program) => program.id === values.trProgramName
        );
        const formattedValues = {
          ...values,
          startDate: values.startDate.format("YYYY-MM-DD"),
          endDate: values.endDate.format("YYYY-MM-DD"),
          trProgramName: selectedProgram?.programName,
        };
        mutation.mutate(formattedValues);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };
  return { handleEditClass };
};
