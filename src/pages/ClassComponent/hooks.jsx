import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { classApi } from "../../services/classApi";
import useClassStore from "./useClassStore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

export const useGetClassList = () => {
  const className = useClassStore((state) => state.className);
  const startDate = useClassStore((state) => state.startDate);
  const endDate = useClassStore((state) => state.endDate);

  const [debouncedKeyword, setDebouncedKeyword] = useState(className);

  useEffect(() => {
    const handler = debounce(() => setDebouncedKeyword(className), 700);
    handler();
    return () => {
      handler.cancel();
    };
  }, [className]);

  const { data, isLoading } = useQuery({
    queryKey: ["classList", debouncedKeyword, startDate, endDate],
    queryFn: () => classApi.getClassList(debouncedKeyword, startDate, endDate),
  });

  return {
    data: data?.data.data,
    isLoading,
  };
};

export const useGetStudentByClassId = (id) => {
  const { data } = useQuery({
    queryKey: ["studentByClassId", id],
    queryFn: () => classApi.getStudentByIdClass(id),
    enabled: !!id, // chi thuc hien khi id co gia tri
  });

  return {
    data: data?.data.data,
  };
};

export const useGetTrainingProgram = () => {
  const { data } = useQuery({
    queryKey: ["trainingProgram-list"],
    queryFn: classApi.getTrainingProgram,
  });

  return {
    data: data?.data.data,
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
        const selectedTrainingProgram = trainingPrograms.find(
          (trainingProgram) =>
            trainingProgram.program_name == values.programName
        );

        const formattedValues = {
          ...values,
          startDate: values.startDate.format("YYYY-MM-DD"),
          endDate: values.endDate.format("YYYY-MM-DD"),
          programId: selectedTrainingProgram?.program_id,
        };
        mutation.mutate(formattedValues);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return { handleAddNew, isPending: mutation.isPending };
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
  return { mutation, isPending: mutation.isPending };
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
        const selectedTrainingProgram = trainingPrograms.find(
          (trainingProgram) =>
            trainingProgram.program_name == values.programName
        );
        const formattedValues = {
          ...values,
          startDate: values.startDate.format("YYYY-MM-DD"),
          endDate: values.endDate.format("YYYY-MM-DD"),
          programId: selectedTrainingProgram?.program_id,
        };

        mutation.mutate(formattedValues);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };
  return { handleEditClass, isPending: mutation.isPending };
};
