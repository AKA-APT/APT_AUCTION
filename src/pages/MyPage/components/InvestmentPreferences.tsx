import { InvestmentTag, tagInfo } from '@/components/InvestmentTag';
import { useInvestmentTags } from '@/hooks/queries/useInvestmentTags';
import { putInvestmentTags } from '@/remotes/my-page';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function InvestmentPreferences() {
  const { data: tags } = useInvestmentTags();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (tagList: number[]) => putInvestmentTags(tagList),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getInvestmentTags'] });
    },
  });

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">내 투자성향</h2>
      <div className="rounded-lg bg-gray-100 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-2xl font-bold">투자성향 목록</h2>
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            관리
          </button>
        </div>

        {isEditing ? (
          <div>
            <div className="flex flex-wrap gap-2">
              <div className="w-full">
                <div className="mb-2 font-bold">선택됨</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(tagInfo)
                    .filter(([k, v]) => tags.find((t) => t.id === Number(k)))
                    .map(([key, preference], index) => (
                      <InvestmentTag
                        key={index}
                        id={Number(key)}
                        name={preference.name}
                        description={preference.description}
                        onClick={() => {
                          mutate(
                            tags
                              .filter((t) => t.id !== Number(key))
                              .map((t) => t.id),
                          );
                        }}
                      />
                    ))}
                </div>
              </div>
              <div className="my-4 w-full border-t border-gray-300"></div>
              <div className="w-full">
                <div className="mb-2 font-bold">선택 안됨</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(tagInfo)
                    .filter(([k, v]) => !tags.find((t) => t.id === Number(k)))
                    .map(([key, preference], index) => (
                      <InvestmentTag
                        id={Number(key)}
                        key={index}
                        name={preference.name}
                        description={preference.description}
                        onClick={() => {
                          mutate(tags.map((t) => t.id).concat(Number(key)));
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>

            <div className="my-4 w-full border-t border-gray-300"></div>
            <div className="flex justify-center">
              <button
                className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                완료
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.length > 1
              ? tags.map((preference, index) => (
                  <InvestmentTag
                    key={index}
                    id={preference.id}
                    name={preference.name}
                    description={preference.description}
                  />
                ))
              : null}
          </div>
        )}
      </div>
    </div>
  );
}
