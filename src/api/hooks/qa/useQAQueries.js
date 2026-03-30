import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { questionService } from '@/api/services/questionService';

export const QA_KEYS = {
  all: ['questions'],
  lists: () => [...QA_KEYS.all, 'list'],
  list: (params) => [...QA_KEYS.lists(), { params }],
  details: () => [...QA_KEYS.all, 'detail'],
  detail: (id) => [...QA_KEYS.details(), id],
  answers: (id) => [...QA_KEYS.detail(id), 'answers'],
  acceptedAnswers: (id) => [...QA_KEYS.answers(id), 'accepted'],
};

export const useQuestionsQuery = (params = {}) => {
  return useQuery({
    queryKey: QA_KEYS.list(params),
    queryFn: () => questionService.getQuestions(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useQuestionDetailQuery = (id, options = {}) => {
  const { increaseView = true } = options;
  return useQuery({
    queryKey: [...QA_KEYS.detail(id), { increaseView }],
    queryFn: () => questionService.getQuestionDetail(id, { increaseView }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAcceptedAnswersQuery = (id) => {
  return useQuery({
    queryKey: QA_KEYS.acceptedAnswers(id),
    queryFn: () => questionService.getAcceptedAnswers(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateQuestionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => questionService.createQuestion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QA_KEYS.lists() });
    },
  });
};
