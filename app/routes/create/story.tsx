import React, { useCallback, useRef } from "react";

// components
import { ClientOnly } from "remix-utils";
import {
  CoverImage,
  CoverImagePopover,
  SubTitle,
  Title,
  WriteTemplate,
  PublishDrawer,
} from "~/components/write";
import { Editor } from "~/components/ui/Editor";
import { WriterHeader } from "~/components/ui/Header";

// hooks
import { useWriteStore } from "~/stores/useWriteStore";
import { useFetcher } from "@remix-run/react";

// validation
import { schema } from "~/libs/validation/schema";
import { ValidationError } from "yup";

import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { TypographyIcon } from "~/components/ui/Icon";
import { Button } from "~/components/ui/Shared";

import type { FileSchema } from "~/api/schema/file";
import type { ActionFunction, LinksFunction } from "@remix-run/cloudflare";

// styles
import editor from "~/styles/editor.css";

export interface FormFieldValues {
  title: string;
  subTitle?: string;
  description: string;
  thumbnail: Omit<FileSchema, "createdAt" | "updatedAt" | "deletedAt"> | null;
  tags?: string[];
  disabledComment: boolean;
  isPublic: boolean;
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: editor }];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const form = {
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
  };

  console.log(form);

  try {
    const validForm = await schema.write().validate(form, {
      abortEarly: false,
    });
  } catch (error) {
    if (ValidationError.isError(error)) {
      const errors = error.inner.reduce((acc, { path, message }) => {
        if (!path) return acc;
        acc[path] = message;
        return acc;
      }, {} as Record<string, string>);

      const focusId = error.inner[0]?.path;
      return {
        focusId,
        errors,
      };
    }
  }
};

export default function CreateStory() {
  const methods = useForm<FormFieldValues>();

  const fetcher = useFetcher();

  const wrpperRef = useRef<HTMLDivElement>(null);

  const { openSubTitle, visible } = useWriteStore();

  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {
    fetcher.submit(input as Record<string, any>, {
      method: "post",
    });
  };

  const onRemoveThumbnail = useCallback(() => {
    methods.setValue("thumbnail", null, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [methods]);

  const watchThumbnail = methods.watch("thumbnail");

  return (
    <div ref={wrpperRef}>
      <FormProvider {...methods}>
        <WriteTemplate header={<WriterHeader />}>
          <form
            method="post"
            className="create-post"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {/* Step1 */}
            <div className="relative mb-10 flex flex-row items-center">
              {!watchThumbnail && <CoverImagePopover />}
              <Button
                className="mr-2 flex flex-row items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-center text-sm font-medium text-gray-700 outline-none"
                aria-label="add post sub title"
                aria-haspopup={visible.subTitle ? "true" : "false"}
                onPress={openSubTitle}
              >
                <TypographyIcon className="mr-2 h-5 w-5 fill-current" />
                <span>Add Subtitle</span>
              </Button>
            </div>
            {/* Cover Image */}
            {watchThumbnail && (
              <CoverImage
                src={watchThumbnail.url}
                onRemove={onRemoveThumbnail}
              />
            )}
            {/* Step2 */}
            <Title />
            {/* SubTitle */}
            <SubTitle />
            {/* Step3 */}
            <div className="relative z-20">
              <ClientOnly fallback={<>Loading....</>}>
                {() => <Editor />}
              </ClientOnly>
            </div>
          </form>

          <PublishDrawer />
        </WriteTemplate>
      </FormProvider>
    </div>
  );
}
