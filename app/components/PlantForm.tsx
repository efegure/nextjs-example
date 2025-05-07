"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { plantFormSchema, PlantFormValues } from "../types/plant-form-schema";
import { createPlant } from "../actions/createPlant";
import { updatePlant } from "../actions/updatePlant";

interface PlantFormProps {
  locations: {
    name: string;
    lat: number;
    long: number;
    id: number;
    ownerId: number;
  }[];
  toBeEdited: {
    id: number;
    name: string;
    type: string;
    weeklyWaterNeedML: number;
    expectedHumidty: number;
    locationId: number;
  } | null;
  currentUserId: number;
}

export default function PlantForm(props: PlantFormProps) {
  const form = useForm<PlantFormValues>({
    resolver: zodResolver(plantFormSchema),
    defaultValues: {
      name: props.toBeEdited?.name ?? "",
      type: props.toBeEdited?.type ?? "",
      weeklyWaterNeedML: props.toBeEdited?.weeklyWaterNeedML ?? 0,
      expectedHumidty: props.toBeEdited?.expectedHumidty ?? 50,
      locationId: props.toBeEdited?.locationId ?? 0,
    },
  });

  const onSubmit = (values: PlantFormValues) => {
    if (props?.toBeEdited?.id) {
      updatePlant(
        { ...values, ownerId: props.currentUserId },
        props.toBeEdited.id
      );
    } else {
      createPlant({ ...values, ownerId: props.currentUserId });
    }
  };

  return (
    <div className="flex flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weeklyWaterNeedML"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weekly Water Need (mL)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expectedHumidty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Humidity (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {props.locations &&
                        props.locations.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id.toString()}>
                            {loc.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
